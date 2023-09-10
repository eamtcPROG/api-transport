
export class ToolsDate {
  public static getTimeStamp(): number {
    let t = new Date().getTime();
    t = t / 1000;
    t = Math.round(t);
    return t;
  }

  public static convertTimestampToDate(timestamp?: number): Date {
    if (timestamp === undefined) return new Date();
    
    const t = timestamp * 1000;
    return new Date(t);
  }

  public static getDateSQL(timestamp?: number): string {
    const rawDate = ToolsDate.convertTimestampToDate(timestamp); 

    const year = rawDate.getFullYear();
    const month = String(rawDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(rawDate.getDate()).padStart(2, '0');

    // const hours = String(rawDate.getHours()).padStart(2, '0');
    // const minutes = String(rawDate.getMinutes()).padStart(2, '0');
    // const seconds = String(rawDate.getSeconds()).padStart(2, '0');


    return `${year}-${month}-${day}`;
  }

  public static getDateTimeSQL(timestamp?: number): string {
    const rawDate = ToolsDate.convertTimestampToDate(timestamp); 

    const year = rawDate.getFullYear();
    const month = String(rawDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(rawDate.getDate()).padStart(2, '0');

    const hours = String(rawDate.getHours()).padStart(2, '0');
    const minutes = String(rawDate.getMinutes()).padStart(2, '0');
    const seconds = String(rawDate.getSeconds()).padStart(2, '0');


    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  public static getDateTimeFile(timestamp?: number): string {
    const rawDate = ToolsDate.convertTimestampToDate(timestamp); 

    const year = rawDate.getFullYear();
    const month = String(rawDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(rawDate.getDate()).padStart(2, '0');

    const hours = String(rawDate.getHours()).padStart(2, '0');
    const minutes = String(rawDate.getMinutes()).padStart(2, '0');
    const seconds = String(rawDate.getSeconds()).padStart(2, '0');


    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  }
}
