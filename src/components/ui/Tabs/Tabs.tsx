import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'
import css from './Tabs.module.css'
import cn from 'classnames'
import { TabPaneProps } from '../TabPane'
import { Tab } from './Tab'
import { isSelectKeyPressed } from 'helpers/helpers'

const isArrowPressed = (code) => code === 'ArrowRight' || code === 'ArrowLeft'

type TabsProps = {
  defaultActiveKey: string
  children: ReactElement<TabPaneProps>[]
  onChange?: (key) => void
  activeTabKey?: string
}

const Tabs: FC<TabsProps> = ({
  children,
  defaultActiveKey,
  onChange,
  activeTabKey,
}) => {
  const [activeTab, _setActiveTab] = useState(defaultActiveKey)
  const tabsRef = useRef([])

  const setActiveTab = (key) => {
    onChange && onChange(key)
    _setActiveTab(key)
  }

  const handlerKeyDown = (tabKey, e) => {
    if (isArrowPressed(e.code)) {
      tabsRef.current.forEach((tab) => {
        if (tab !== e.target) {
          tab.focus()
          e.target.tabIndex = -1
          tab.tabIndex = 0
        }
      })
    }

    if (isSelectKeyPressed(e.code)) {
      tabsRef.current.forEach((tab) => {
        if (tab === e.target) {
          const nextActiveTab = tab.id
          if (activeTab !== nextActiveTab) {
            setActiveTab(nextActiveTab)
          }
        }
      })
    }
  }

  const childrenCount = React.Children.count(children)

  useEffect(() => {
    tabsRef.current = tabsRef.current.slice(0, childrenCount)
  }, [childrenCount])

  useEffect(() => {
    if (activeTabKey) {
      _setActiveTab(activeTabKey)
    }
  }, [activeTab, activeTabKey])

  return (
    <div>
      <ol className="flex px-6" role="tablist" aria-label="Form selection tabs">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <Tab
                tabKey={child.props.tabKey}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                handlerKeyDown={handlerKeyDown}
                tabsRef={tabsRef}
                index={index}
              >
                {child.props.tab}
              </Tab>
            )
          }
        })}
      </ol>
      <div className="flex">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const { tabKey } = child.props
            const isFirst = index === 0
            const isActive = activeTab === tabKey

            return (
              <div
                className={cn(css.tabContent, {
                  [css.tabContentActive]: isActive,
                  [css.right]: isFirst,
                  [css.left]: !isFirst,
                })}
                /* accessibility */
                role="tabpanel"
                tabIndex={isActive ? 0 : -1}
                id={`panel-${tabKey}`}
                aria-labelledby={tabKey}
                aria-hidden={isActive ? 'false' : 'true'}
              >
                {child.props.children}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export { Tabs }
