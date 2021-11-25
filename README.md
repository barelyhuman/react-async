# react-async

> async utilities for react (hooks, views, and more)

## Why?

[You can read that here](https://reaper.im/posts/working-with-async-code-in-react.html)

## Installation

```sh
npm i @barelyhuman/react-async
# or
yarn add @barelyhuman/react-async
```

## Usage

The lib comes with 3 utilites to help you work with async code.

- [`AsyncView`](#asyncview)
- [`useAsyncEffect`](#useasynceffect)
- [`useAsync`](#useasync)

### AsyncView

`AsyncView` is a simple View that renders the children with a certain set of parameters to allow using asynchronous data.

This is best for cases where you are writing a simple component that's isolated and at max uses one datasource render.

By _one datasource_ I mean that you render the `AsyncView` once in the component without having to nest it inside other `AsyncView`'s in the same component tree.

Example:

```jsx
<>
  <AsyncView data={_fetchAdminProfile} options={{ params: id, pause: !id }}>
    {({ data, loading, error }) => {
      if (loading) {
        return (
          <View>
            <Text>Loading...</Text>
          </View>
        );
      }
      if (error) {
        return (
          <View>
            <Text error>{error.message}</Text>
          </View>
        );
      }
      return (
        <>
          <NavigationLayout title={data.name} left={<AppBar.BackButton />}>
            <ProfileCard data={data} onUpdate={onRefetchData} />
            <AdminProfileTabs data={data} onUpdate={onRefetchData} />
          </NavigationLayout>
        </>
      );
    }}
  </AsyncView>
</>
```

As mentioned before, best practice for this component is pretty limited to isolated data points. Here, the `_fetchAdminProfile` is a helper/sdk function from outside the component file and it's work is to just return the data or `throw` an error based on which the children params are provided

### useAsyncEffect

This is a simple wrapper around `useEffect` that allows you to run `async` functions with the needed dependencies, the usecases for these match the above but aren't limited to a single datasource since you can manipulate state from here for as many as required.

It is still recommended to offload this effect into a custom data hook for your component and manage state there to keep your component code easy to manage.

Example:

```jsx
// sdk.js

// naive example of handling a request, you might need a better fetch handler like
// ky from sindre or fetch-retry from vercel
function fetchUser() {
  let userData;
  return fetch(URLS.USER)
    .then((r) => {
      if (!r.ok) {
        return Promise.reject(r);
      }
      return r.json();
    })
    .then((_userData) => {
      userData = _userData;
      return fetch(URLS.USER_ADDRESS);
    })
    .then((r) => {
      if (!r.ok) {
        return Promise.reject(r);
      }
      return r.json();
    })
    .then(addressDetails=>{
        userData.address = {
            ....addressDetails
        }
        return userData;
    });
}

export const SDK = {
  fetchUser,
};
---
// component.js
useAsyncEffect(async () => {
  const response = await SDK.fetchUser(id);
  setUserDetails(response.data);
}, [id]);
```

### useAsync

A custom hook for data fetching, that accepts a fetching promise and returns `{error, loading, data}` like any other fetching library in the community.

considering the same `fetchUser` from above

Example:

```jsx
function Component({ id, ...props }) {
  const { data, error, loading, refetch } = useAsync(SDK.fetchUser, {
    // the parameter to pass to the function
    params: id,
    // wait for this condition to be `false`
    pause: !id,
  });

  const onRefetch = () => {
    refetch(id); //=> send new params
    // refetch(); //=> use the one's from the original options value
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    // show alert / raise toast etc
    return <></>;
  }

  return <>Hello, {data.name}</>;
}
```

### Similar

- [vercel/swr](https://github.com/vercel/swr) - includes caching and revalidation
- [async-library/react-async](https://github.com/async-library/react-async) - has a lot more features and jazz

## License

[MIT](LICENSE)
