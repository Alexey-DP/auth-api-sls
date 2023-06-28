export interface IShortLinkSuccess {
  shortLink: string;
}

export interface IOriginalLinkReq {
  originalLink: string;
}

export interface IShortLinkDb {
  id?: string;
  short_path: string;
  original_link: string;
}
