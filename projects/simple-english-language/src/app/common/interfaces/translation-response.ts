export interface TranslationResponse {
    meta: {
        id: string;
        uuid: string;
        lang: string;
        src: string;
        section: string;
        stems: string[];
        syns: string[];
        ants: string[];
        offensive: boolean;
    };
    hwi: {
        hw: string;
        prs: [
            {
                mw: string;
                sound: {
                    audio: string;
                };
            }
        ];
    };
    fl: string;
    def: [
        {
            sseq: [
                [
                    [
                        string,
                        {
                            sn: string;
                            dt: [
                                string[],
                                string[],
                                string[],
                                string[],
                                [
                                    string,
                                    [
                                        {
                                            t: string;
                                            tr: string;
                                        }
                                    ]
                                ]
                            ];
                        }
                    ]
                ]
            ];
        }
    ];
    shortdef: string[];
}
