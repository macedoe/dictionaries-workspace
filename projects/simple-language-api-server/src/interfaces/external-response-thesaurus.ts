export interface ExternalResponseThesaurus {
    meta: {
        id: string;
        uuid: string;
        src: string;
        section: string;
        stems: string[];
        syns: [string[]];
        ants: [string[]];
        offensive: boolean;
    };
    hwi: {
        hw: string;
        prs: {
            mw: string;
            sound: {
                audio: string;
                ref: string;
            };
        }[];
    };
    fl: string;
    shortdef: string[];
}
