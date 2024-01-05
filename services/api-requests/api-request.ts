// import { apiUrl_ } from '../config';
import axios from 'axios';
import * as React from 'react';
import * as io from 'socket.io-client';
import { GetUserAuthToken } from '@/services/config';
const MySocketUrlV1 = 'ws://localhost:8080';

// const baseUrl = apiUrl_;
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const loginUrl = `${baseUrl}/api/v1/users`;
const scriptUrl = `${baseUrl}/api/v1/script`;
const chapterUrl = `${baseUrl}/api/v1/chapters`;

export const SubmitEmailRequest = (props: { email: string }) => {
  return axios.post(`${loginUrl}/create-user`, {
    email: props.email,
  });
};

export const validateUserLogin = (props: { userId: string; otp: number }) => {
  return axios.post(`${loginUrl}/validate-pin`, {
    user_id: props.userId,
    otp: props.otp,
  });
};

export const createNewScript = (props: { userId: string; token: string }) => {
  return axios.post(
    `${scriptUrl}/create-script/${props.userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );
};

export const fetchAllScripts = (props: { userId: string; token: string }) => {
  return axios.get(`${scriptUrl}/fetch-scripts/${props.userId}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });
};

export const fetchScript = (props: { token: string; scriptId: string }) => {
  const response = axios.get(`${scriptUrl}/fetch-script/${props.scriptId}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });
  return response;
};

export const updateScriptRequest = (props: {
  userId: string;
  scripts: string[];
  token: string;
}) => {
  return axios.put(
    `${scriptUrl}/update-scripts/${props.userId}`,
    {
      scripts: props.scripts,
    },
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );
};

export const updateScriptThrashRequest = (props: {
  userId: string;
  checkedboxArray: string[];
  token: string;
}) => {
  return axios.put(
    `${scriptUrl}/update-scripts/trash/${props.userId}`,
    {
      scriptIds: props.checkedboxArray,
    },
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );
};

export const handleRenameRequest = (props: {
  userId: string;
  scriptId: string;
  title: string;
  token: string;
}) => {
  return axios.put(
    `${scriptUrl}/update-scripts/rename/${props.userId}`,
    {
      script_id: props.scriptId,
      title: props.title,
    },
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );
};

export const updateThrashOneRequest = (props: {
  userId: string;
  scriptId: string;
  token: string | null | undefined;
}) => {
  return axios.put(
    `${scriptUrl}/update-scripts/trash-one/${props.userId}`,
    {
      script_id: props.scriptId,
    },
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );
};

export const duplicateScriptRequest = (props: {
  userId: string;
  scriptId: string;
  token: string;
}) => {
  return axios.put(
    `${scriptUrl}/update-scripts/duplicate-script/${props.userId}`,
    {
      script_id: props.scriptId,
    },
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );
};

export const deleteScriptRequest = (props: {
  userId: string;
  scriptId: string;
  token: string;
}) => {
  return axios.put(
    `${scriptUrl}/delete-scripts/delete-one/${props.userId}`,
    {
      script_id: props.scriptId,
    },
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );
};

export const unthrashScript = (props: {
  userId: string;
  scriptId: string;
  token: string;
}) => {
  return axios.put(
    `${scriptUrl}/update-scripts/untrash-one/${props.userId}`,
    {
      script_id: props.scriptId,
    },
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );
};

export const fetchAllChapter = (props: {
  scriptId: string | string[] | undefined;
  token: string | undefined;
}) => {
  return axios.get(`${chapterUrl}/all-chapters/${props.scriptId}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });
};
export const fetchAllParagraphs = (props: {
  chapterId: string | string[] | undefined;
  token: string | undefined;
}) => {
  return axios.get(`${chapterUrl}/all-paragraphs/${props.chapterId}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });
};

export const updateChapterTitle = (props: {
  chapterId: string;
  userId: string;
  title: string;
  token: string | undefined;
}) => {
  return axios.put(
    `${chapterUrl}/update-title/${props.userId}`,
    {
      chapter_id: props.chapterId,
      title: props.title,
    },
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );
};

export const scriptAIChat = (props: {
  userId: string;
  scriptId: string;
  messages: any;
  token: any;
}) => {
  return axios.post(
    `${chapterUrl}/api/chat`,
    {
      user_id: props.userId,
      scriptId: props.scriptId,
      messages: props.messages,
    },
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );
};

// export const deleteChapterRequest = (props: {
//   scriptId: string
//   chapterId: string
//   token: string
// }) => {
//   return axios.delete(
//     `${chapterUrl}/delete-chapter/script_id/${props.scriptId}`,
//     {
//       chapter_id: props.chapterId,
//     },
//   )
// }

// export const createNewChapter = (props: {
//   scriptId: string
//   token: string
// }) => {
//   return axios.post(
//     `${chapterUrl}/create-chapter`,
//     { script_id: props.scriptId },
//     { headers: { Authorization: `Bearer ${props.token}` } },
//   )
// }

