// ... other imports

export default function MyApp(props) {
  var { user, setUser } = useContext(AppContext);
  const { Component, pageProps } = props;

  return (
    <AppContext.Provider value={{ isAuthenticated: false, user: null, setUser: () => {} }}>
      <Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Head>
    </AppContext.Provider>
  );
}
