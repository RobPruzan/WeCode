import axios from 'axios';

export type PostContent = {
  user?: string;
  content: string;
  code?: string;
  likes?: number;
  dislikes?: number;
  comments?: number;
  langauge?: string;
  hasCode?: boolean;
};
export class WeCodeApi {
  baseUrl?: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
  }
  public async sendPost(
    postContent?: PostContent,
    room = 'Main'
  ): Promise<void> {
    const response = await axios.post(
      `${this.baseUrl}/post_content/${room}`,
      postContent
    );
  }

  public async getPosts(room = 'Main'): Promise<PostContent[]> {
    console.log('Room Value in connection get request function', room);
    const response = await axios.get(`${this.baseUrl}/post_content/${room}}`);

    return response.data;
  }
}

const WeCode = new WeCodeApi();
export default WeCode;
