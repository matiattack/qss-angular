export class FooterSetting {

  protected static settings : FooterSetting;

  public get ADD_COMMENT(): string { return 'add-comment-footer'; }
  public get ADD_DIFFUSION(): string { return 'diffusion-footer'; }
  public get DIFFUSION_MEDIA(): string { return 'deiffusion-media-footer'; }

  static getInstance() : FooterSetting{
    if(!this.settings){
      this.settings=new FooterSetting();
    }
    return this.settings;
  }
}
