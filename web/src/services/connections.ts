import axios from 'axios';
// TODO remove optional fields
export type PostContent = {
  user?: string;
  content: string;
  code?: string;
  flair?: string;
  upvotes?: number;
  comments?: number;
  langauge?: string;
  hasCode?: boolean;
};

export type User = {
  id: number;
  name: string;
  photo: Blob;
};

export type UserName = {
  id: number;
  name: string;
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
    console.log(
      'Post content in connection post request function',
      postContent
    );
    const response = await axios.post(
      `${this.baseUrl}/post_content/${room}`,
      postContent
    );
  }

  public async getPosts(room = 'Main'): Promise<PostContent[]> {
    console.log('base url', this.baseUrl);
    console.log('Room Value in connection get request function', room);
    const response = await axios.get(`${this.baseUrl}/post_content/${room}}`);

    return response.data;
  }

  public async getUsers(): Promise<UserName[]> {
    console.log('base url', this.baseUrl);
    const response = await axios.get(`${this.baseUrl}/users`);
    return response.data;
  }
}

const WeCode = new WeCodeApi();
export default WeCode;
