export const emailValidation = (value: string): boolean | string => {
  if (!value.includes('@')) return "Email must include '@' symbol"
  if (
    /**
     * RFC 5322 Official Standard (http://emailregex.com/)
     * Это плохой UX, есть отличный доклад по поводу валидации поля email,
     * на основе конечных автоматов от Михайло Иванкина
     * https://www.youtube.com/watch?v=C5vIEHHG1aA&ab_channel=%D0%92%D0%B5%D0%B1-%D1%81%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D1%8B
     * */
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  ) {
    return 'Incorrect email'
  }
  return true
}
