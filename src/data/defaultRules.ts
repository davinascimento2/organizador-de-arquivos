import { SortRule } from '../types';

export const DEFAULT_RULES: SortRule[] = [
  {
    id: 'docs',
    folderName: 'Documents',
    extensions: ['.pdf', '.docx', '.doc', '.txt', '.xlsx', '.pptx', '.csv', '.md']
  },
  {
    id: 'images',
    folderName: 'Images',
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico']
  },
  {
    id: 'audio',
    folderName: 'Audio',
    extensions: ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a']
  },
  {
    id: 'video',
    folderName: 'Videos',
    extensions: ['.mp4', '.mkv', '.mov', '.avi', '.webm']
  },
  {
    id: 'archives',
    folderName: 'Archives',
    extensions: ['.zip', '.rar', '.7z', '.tar', '.gz']
  },
  {
    id: 'code',
    folderName: 'SourceCode',
    extensions: ['.py', '.js', '.ts', '.html', '.css', '.json', '.sql', '.cpp', '.rs']
  },
  {
    id: 'executables',
    folderName: 'Installers',
    extensions: ['.exe', '.msi', '.dmg', '.pkg', '.deb']
  }
];
