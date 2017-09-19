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
}

