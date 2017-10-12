export class AppSetting {

  public static get API_ENDPOINT(): string { return 'http://localhost/qss-core/public/'; }
  public static get MEDIA_ENDPOINT(): string { return 'http://localhost/qss-core/public/'; }
  public static get PROFILE_IMAGE_PLACEHOLDER(): string { return 'http://placehold.it/455x680'; }
  public static get IMAGE_PLACEHOLDER(): string { return 'http://placehold.it/150x150'; }
  public static get DISCIPLINE_IMAGE_PLACEHOLDER(): string { return 'http://placehold.it/455x680'; }

  public static URI(uri: string): string {
    if(!localStorage.getItem('token')){
      return AppSetting.API_ENDPOINT + uri;
    }
    return AppSetting.API_ENDPOINT + uri + '?token=' + localStorage.getItem('token');
  }

  public static MONTH(index: number): string {
    let months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return months[index];
  }

  public static FORMATDATE(date): string {
    let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}

