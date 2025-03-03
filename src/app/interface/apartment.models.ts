export interface apartment{
    id: number|string,
    title:string,
    description:string,
    photos:Array<any>
    img:string,
    rentalTerms:string,
    contactInfo:string,
    comments:Array<any>,
    interestedUsers: Array<string>,
    furnishedDetail?: string,
    address?: string,
    aparmentSelected?:string
}