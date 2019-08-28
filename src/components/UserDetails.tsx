import React, { useEffect } from "react";
import styled from "styled-components";
import NewsStore from "../stores/NewsStore";
import { inject, observer } from "mobx-react";
import { Loading } from "./Loading";

const Container = styled.div`
  flex-direction: column;
  padding: 10px;
  display: grid;
  grid-template-columns: auto auto;
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
  gap: 0 10px;
  justify-content: center;
`;

export const UserDetails = inject("store")(
  observer((props: { store: NewsStore; match: {params: {id: string}}}) => {
    const { store, match } = props;
    const id = match.params.id;
    useEffect(() => {
      store.loadUser(id);
    }, [store, id]);

    const { isLoading, users } = store;
    const user = users.find(user => user.id === id);
    return (
      <Container>
        {isLoading && <Loading />}
        {user && (
          <React.Fragment>
            <span>User:</span>
            <span>{user.id}</span>
            <span>Created:</span>
            <span> {user.created}</span>
            <span>Karma:</span>
            <span>{user.karma}</span>
          </React.Fragment>
        )}
      </Container>
    );
  })
);
