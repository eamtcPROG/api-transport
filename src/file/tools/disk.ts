export enum DiskType {
    public = 'public',
    private = 'private',
}

export enum DiskTypeRoot {
    root = 'root',
}
export enum StorageEntityType {
  courses = 'courses',
  categories = 'categories',
  gallery = 'gallery',
  attachment = 'attachment',
  tests = 'tests',
}

export enum Disks {
    public = 'local_public',
    private = 'local_private',
    root = 'local_root',
}

export type DiskTypeAll = DiskType | DiskTypeRoot;