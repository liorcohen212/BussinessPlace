export default  interface Card {
    title: string,
    description: string,
    email: string;
    imageUrl?: string,
    state?: string;
    city: string;
    housenumber: number;
    subtitle: string;
    phone:string;
    web?: string;
    imageAlt?: string;
    country: string;
    street: string;
    zip?: number;
    id: number;
    owner?: number | string;
}