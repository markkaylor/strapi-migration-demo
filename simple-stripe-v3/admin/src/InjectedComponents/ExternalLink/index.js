import React from "react";
import styled from "styled-components";
import { useContentManagerEditViewDataManager } from "strapi-helper-plugin";

const StyledExternalLink = styled.a`
  display: block;
  color: #333740;
  text-decoration: none;
  padding: 20px;
  border-radius: 4px;
  background-color: #007eff;
  box-shadow: 0px 1px 4px rgba(33, 33, 52, 0.1);
  color: white;
  &:hover {
    color: white;
  }
`;

const LinkContainer = styled.div`
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ExternalLink = () => {
  const { modifiedData } = useContentManagerEditViewDataManager();

  if (!modifiedData.stripeProductId) {
    return null;
  }

  return (
    <LinkContainer>
      <StyledExternalLink
        href={`https://dashboard.stripe.com/test/payments/${modifiedData.stripeProductId}`}
        target="_blank"
        rel="noopener noreferrer"
        title="stripe dashboard"
      >
        Open in Stripe Dashboard
      </StyledExternalLink>
    </LinkContainer>
  );
};

export default ExternalLink;
