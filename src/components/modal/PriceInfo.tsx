import styled from "styled-components";

type PriceInfoProps = {
  price: number;
};

export const PriceInfo = ({ price }: PriceInfoProps) => {
  return (
    <PriceInfoDiv>
      <p>변경 금액</p>
      <b>
        {price > 0 ? `+${price.toLocaleString()}` : price.toLocaleString()} 원
      </b>
    </PriceInfoDiv>
  );
};

const PriceInfoDiv = styled.div`
  width: 80%;
  padding: 0 10px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > p {
    margin: 0;
    font-size: 12px;
    font-weight: bold;
  }

  > b {
    font-size: 13px;
    color: #007fa8;
  }
`;
