import { ChallengeCreate } from '../components/MainPage/Challenges/CreateChallenge/CreateChallenge';
import { Filters } from '../components/MainPage/Filters/FilterOptions';
import { SpaceInfo } from '../components/MainPage/Options/CreateSpace/CreateSpace';
import axios from 'axios';
import { useSelector } from 'react-redux';

// This is tied to the VoteType enum in the backend
export enum VoteType {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
  NOVOTE = 'NOVOTE',
}

export type LikedByMinimal = {
  user: UserMinimal;
  vote_type: VoteType;
};
// TODO remove optional fields
export type PostContent = {
  id?: number;
  user_id?: number;
  content: string;
  code?: string;
  flair?: string;
  likes?: number;
  liked_by?: LikedByMinimal[] | null;
  comments?: number;
  language?: string;
  hasCode?: boolean;
  date?: string;
};

export type CommentType = {
  id: number;
  user: string;
  content: string;
  reply_to?: PostContent;
  upVotes?: number;
  comments?: CommentType[];
};

export type User = {
  id: number;
  name: string;
  followers: User[];
  following: User[];
  friends: User[];
  photo: Blob;
};

export type UserMinimal = {
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

export type SpaceMinimal = {
  id: number;
  name: string;
};

export type AnswerId = number;

export type Answer = {
  id: AnswerId;
  challenge: ChallengeMinimal;
  text: string;
};

export type AnswerMinimal = {
  text: string;
};

export type UserAnswer = {
  userId?: number;
  challengeId: number;
  answerId: AnswerId;
};

export type ChallengeMinimal = {
  id: number;
  title: string;
};

export type Challenge = {
  id: number;
  title: string;
  users_that_succeeded: UserMinimal[];
  users_that_failed: UserMinimal[];
  users_that_attempted: UserMinimal[];
  author: UserMinimal;
  space: SpaceMinimal;
  description: string;
  question: string;
  date: Date;
  difficulty: number;
  correct_answer: AnswerId;
  answers: Answer[];
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
    // TODO remove optional fields
    const newPostContent: PostContent = {
      content: postContent?.content ?? '',
      code: postContent?.code ?? '',
      flair: postContent?.flair ?? '',
      language: postContent?.language ?? '',
      likes: postContent?.likes ?? 0,
      user_id: postContent?.user_id ?? 0,
    };
    const response = await axios.post(
      `${this.baseUrl}/post_content/${space_id}`,
      newPostContent
    );
  }
  // add url parameters
  public async getFilteredPosts(
    space_id: number,
    filteredChoices: Filters
  ): Promise<PostContent[]> {
    const url = new URL(
      `${this.baseUrl}/filtered_post_content/${space_id ?? 1}`
    );
    const csvLanguages = filteredChoices.languages
      .map(language => language.label)
      .join(',');
    const csvNames = filteredChoices?.names.map(name => name.id).join(',');
    const csvFlairs = filteredChoices?.flairs
      .map(flair => flair.label)
      .join(',');
    url.searchParams.set('languages', csvLanguages);
    url.searchParams.set('names', csvNames);
    url.searchParams.set('flairs', csvFlairs);

    const response = await axios.get(url.toString());
    return response.data;
  }

  public async getPosts(
    space_id: number,
    numberOfPosts?: number
  ): Promise<PostContent[]> {
    const url = new URL(`${this.baseUrl}/post_content/${space_id}`);
    url.searchParams.set('number_of_posts', numberOfPosts?.toString() ?? '50');
    const response = await axios.get(url.toString());
    return response.data;
  }

  public async putLikes(
    space_id: number,
    upVotes: number
  ): Promise<PostContent[]> {
    const response = await axios.put(
      `${this.baseUrl}/post_content/${space_id}`,
      { upVotes }
    );
    return response.data;
  }

  public async getUserPosts(user_id: number): Promise<PostContent[]> {
    const response = await axios.get(`${this.baseUrl}/user_posts/${user_id}`);
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

  public async getUsernames(): Promise<UserMinimal[]> {
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

  public async getComments(postId: number): Promise<CommentType[]> {
    const response = await axios.get(`${this.baseUrl}/comments/${postId}`);
    return response.data;
  }

  public async followerUser(
    user_id: number,
    user_to_follow_id: number
  ): Promise<void> {
    await axios.post(`${this.baseUrl}/follow/${user_id}`, {
      user_id,
      user_to_follow_id,
    });
  }

  public async unfollowUser(
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

  public async getChallengeAndAnswers(spaceId: number): Promise<Challenge[]> {
    const response = await axios.get(`${this.baseUrl}/challenge/${spaceId}`);
    return response.data.sort((a: Challenge, b: Challenge) => {
      return b.id - a.id;
    });
  }

  public async createChallenge(
    challenge: ChallengeCreate,
    spaceId: number,
    userId: number
  ): Promise<void> {
    await axios.post(`${this.baseUrl}/challenge/${spaceId}`, {
      user_id: userId,
      challenge,
    });
  }

  public async answerChallenge({
    answerId,
    challengeId,
    userId,
  }: UserAnswer): Promise<string> {
    const response = await axios.post(`${this.baseUrl}/answer`, {
      user_id: userId,
      challenge_id: challengeId,
      answer_id: answerId,
    });

    return response.data;
  }
  public async updateVote(
    postId: number,
    userId: number,
    vote_type: VoteType
  ): Promise<PostContent> {
    const response = await axios.put(`${this.baseUrl}/vote/${postId}`, {
      user_id: userId,
      vote_type,
    });
    return response.data;
  }
}

const WeCode = new WeCodeApi();
export default WeCode;
