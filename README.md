# user

User-related utilities for Generative.fm

## Usage

```javascript
import { getUser, updateUser, clearUser } from '@generative.fm/user';

getUser({ userId, token })
  .then((user) =>
    updateUser({
      partialUser: {
        userId,
        updatedProp: 'value',
      },
      token,
    })
  )
  .then(() => {
    clearUser();
  });
```

## Endpoint

Provide a `GFM_USER_ENDPOINT` environment variable.
