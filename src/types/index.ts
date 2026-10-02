export interface FileItem {
  id: string;
  name: string;
  sizeBytes: number;
  extension: string;
  modifiedDate: string;
  category: string;
  targetFolder: string;
  fileBlob?: File | Blob;
}

export interface SortRule {
  id: string;
  folderName: string;
  extensions: string[];
}

export interface SortStats {
  totalFiles: number;
  totalSizeBytes: number;
  foldersCreated: number;
}
