import {Expose} from 'class-transformer';

import {StatusAppeal} from '../../../libs/enum/index.js';

export class AppealRdo {
  @Expose({name: 'id'})
  public numberAppeal!: string;

  @Expose({name: 'created_at'})
  public dataPublication!: string;

  @Expose()
  public client!: string;

  @Expose()
  public email!: string;

  @Expose({name: 'topic_appeal'})
  public topicAppeal!: string;

  @Expose()
  public appeal!: string;

  @Expose()
  public status!: StatusAppeal;

  @Expose()
  public statusResponse!: string;
}
