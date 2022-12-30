import styled from 'styled-components';

export const ButtonLoad = styled.div`
  padding: ${p => p.theme.space[4]}px;
  border-radius: ${p => p.theme.radii.normal};
  background-color: ${p => p.theme.colors.primary};
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  margin: ${p => p.theme.space[0]}px auto;
  color: ${p => p.theme.colors.white};
  border: ${p => p.theme.space[0]}px;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: ${p => p.theme.fontSizes.m};
  line-height: ${p => p.theme.lineHeights.body};
  font-style: normal;
  font-weight: ${p => p.theme.fontWeights.normal};
  width: 180px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  :hover,
  .Button:focus {
    background-color: ${p => p.theme.colors.accent};
  }
`;
