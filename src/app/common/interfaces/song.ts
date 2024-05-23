export type SongFile = {
  blob_id: string;
  commit_id: string;
  content: string;
  content_sha256: string;
  encoding: string;
  execute_filemode: false;
  file_name: string;
  file_path: string;
  last_commit_id: string;
  ref: string;
  size: number;
};

export type Song = {
  author: string;
  title: string;
  filename: string;
};
