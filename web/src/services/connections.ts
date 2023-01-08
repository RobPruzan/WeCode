import { SpaceInfo } from '../components/MainPage/Options/CreateSpace/CreateSpace';
import axios from 'axios';
// TODO remove optional fields
export type PostContent = {
  id?: number;
  user_id?: number;
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
  followers: User[];
  following: User[];
  friends: User[];
  photo: Blob;
};

export type UserName = {
  id: number;
  label: string;
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

  public async getUserPosts(user_id: number): Promise<PostContent[]> {
    const response = await axios.get(`${this.baseUrl}/user_posts/${user_id}}`);
    return response.data;
  }

  public async createUser(name: string): Promise<User> {
    const response = await axios.post(`${this.baseUrl}/user`, { name });
    return response.data;
  }

  public async getUser(id: number): Promise<User> {
    const response = await axios.get(`${this.baseUrl}/user/${id}`);
    return response.data;
  }

  public async getUsernames(): Promise<UserName[]> {
    const response = await axios.get(`${this.baseUrl}/user_names`);
    return response.data;
  }

  public async getUsers(): Promise<User[]> {
    const response = await axios.get(`${this.baseUrl}/users`);
    return response.data;
  }

  public async getSpaces(userId: number): Promise<Space[]> {
    const response = await axios.get(`${this.baseUrl}/spaces/${userId}`);
    return response.data;
  }

  public async createSpace(
    spaceInfo: SpaceInfo,
    user_id: number
  ): Promise<void> {
    await axios.post(`${this.baseUrl}/spaces/${user_id}`, spaceInfo);
  }

  public async getComments(postId: number): Promise<Comment[]> {
    const response = await axios.get(`${this.baseUrl}/comments/${postId}`);
    return response.data;
  }

  public async followerUser(
    user_id: number,
    user_to_follow_id: number
  ): Promise<void> {
    console.log('clicked to follow');
    await axios.post(`${this.baseUrl}/follow`, {
      user_id,
      user_to_follow_id,
    });
  }

  public async unfollowerUser(
    user_id: number,
    user_to_unfollow_id: number
  ): Promise<void> {
    await axios.delete(
      `${this.baseUrl}/unfollow/${user_id}/${user_to_unfollow_id}`
    );
  }

  public async getFollowers(userId: number): Promise<User[]> {
    const response = await axios.get(`${this.baseUrl}/follow/${userId}`);
    return response.data;
  }

  public async getFollowing(userId: number): Promise<User[]> {
    const response = await axios.get(`${this.baseUrl}/following/${userId}`);
    return response.data;
  }
}

const WeCode = new WeCodeApi();
export default WeCode;
