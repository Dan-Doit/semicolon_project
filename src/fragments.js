export const USER_FRAGMENT = `
fragment UserParts on User{
    id
    username
    email
    firstName
    lastName
    bio
    posts {
        id
        caption
        location
    }
}
`;

export const COMMENT_FRAGMENT = `
fragment UserParts on Comment{
      id
      text
      user{
        username
      }
    }
`;

export const LIKE_FRAGMENT = `
fragment UserParts on likeUsers{
      user{
        username
      }
    }
`;