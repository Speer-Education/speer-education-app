import { PublicUser, UserDetailsDocument } from "../types/User";

export const getMajor = (user: PublicUser): string => {
    //get last item in education and return major
    if(!user.education) return 'No Major'
    const lastEducation = user.education[user.education.length - 1];    
    return lastEducation.major || "";
}

export const getSchool = (user: PublicUser): string => {
    //get last item in education and return major
    if(!user.education) return 'No School'
    const lastEducation = user.education[user.education.length - 1];    
    return lastEducation.school || "";
}