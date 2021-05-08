export const registrationMessage = (email: string) => (
  <>
    Successful registration for: <span className="font-bold">{email}</span>
  </>
)
export const loggedMessage = (email: string) => (
  <>
    Email: <span className="font-bold">{email}</span>
  </>
)
export const defaultMessage = <span>Authentication app</span>
