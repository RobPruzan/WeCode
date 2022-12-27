import axios from 'axios';
import { SpaceInfo } from '../components/MainPage/Options/CreateSpace/CreateSpace';
// TODO remove optional fields
export type PostContent = {
  id?: number;
  user?: string;
  content: string;
  code?: string;
  flair?: string;
  upvotes?: number;
  comments?: number;
  langauge?: string;
  hasCode?: boolean;
};

export type Comment = {
  id: number;
  user: string;
  content: string;
  reply_to?: PostContent;
  upVotes?: number;
  comments?: Comment[];
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

export type Space = {
  id: number;
  name: string;
  description: string;
  num_members: number;
  members: User[];
};

export class WeCodeApi {
  baseUrl?: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
  }
  public async sendPost(
    postContent?: PostContent,
    space_id = 1
  ): Promise<void> {
    const response = await axios.post(
      `${this.baseUrl}/post_content/${space_id}`,
      postContent
    );
  }

  public async getPosts(space_id = 1): Promise<PostContent[]> {
    const response = await axios.get(
      `${this.baseUrl}/post_content/${space_id}}`
    );

    return response.data;
  }

  public async getUsers(): Promise<UserName[]> {
    const response = await axios.get(`${this.baseUrl}/users`);
    return response.data;
  }

  public async getSpaces(): Promise<Space[]> {
    const response = await axios.get(`${this.baseUrl}/spaces`);

    return response.data;
  }

  public async createSpace(spaceInfo: SpaceInfo): Promise<void> {
    await axios.post(`${this.baseUrl}/spaces`, spaceInfo);
  }

  public async getComments(post_id: number): Promise<Comment[]> {
    const response = await axios.get(`${this.baseUrl}/comments/${post_id}`);
    return response.data;
  }
}

const WeCode = new WeCodeApi();
export default WeCode;
