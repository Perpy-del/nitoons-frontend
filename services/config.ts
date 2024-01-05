export const apiUrl_ = process.env.NEXT_PUBLIC_API_URL
export const openAIKey_ = process.env.NEXT_PUBLIC_OPEN_AI_KEY

export const StoreUserAuthToken = (token: string) => {
  if (token) {
    if (typeof localStorage !== 'undefined') {
      return localStorage.setItem('user_token', token)
    }
  }
}

export const GetUserAuthToken = () => {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('user_token')
    return token
  }
}

export const clearUserAuthToken = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('user_token')
  }
}

export const StoreUserDetails = (details: any) => {
  if (typeof localStorage !== 'undefined') {
    const userEmail = localStorage.setItem('user_email', details.email);
    const userId = localStorage.setItem('user_id', details.userId);
    return {userEmail, userId};
  }
}

// export const GetUserDetails = () => {
//   const details = localStorage.getItem('user_details');
//   return details ? JSON.parse(details) : undefined;
// }

export const GetUserMail = () => {
  return localStorage?.getItem('user_email');
}

export const GetUserId = () => {
  return localStorage?.getItem('user_id');
}