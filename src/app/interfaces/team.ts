export interface Teams {
    api: API;
}

export interface API {
    results: number;
    teams: Team[];
}

export interface Team {
    team_id: number;
    name: string;
    code: string | null;
    logo: string;
    country: string;
    founded: number;
    venue_name: string;
    venue_surface: string;
    venue_address: string;
    venue_city: string;
    venue_capacity: number;
}
