export interface Article {
    abstract:         string;
    web_url:          string;
    snippet:          string;
    lead_paragraph:   string;
    print_section:    string;
    print_page:       string;
    source:           string;
    multimedia:       any[];
    headline:         Headline;
    keywords:         Keyword[];
    pub_date:         string;
    document_type:    string;
    news_desk:        string;
    section_name:     string;
    byline:           Byline;
    type_of_material: string;
    _id:              string;
    word_count:       number;
    uri:              string;
}

export interface Byline {
    original:     string;
    person:       Person[];
    organization: null;
}

export interface Person {
    firstname:    string;
    middlename:   null;
    lastname:     string;
    qualifier:    null;
    title:        null;
    role:         string;
    organization: string;
    rank:         number;
}

export interface Headline {
    main:           string;
    kicker:         null;
    content_kicker: null;
    print_headline: string;
    name:           null;
    seo:            null;
    sub:            null;
}

export interface Keyword {
    name:  string;
    value: string;
    rank:  number;
    major: string;
}
