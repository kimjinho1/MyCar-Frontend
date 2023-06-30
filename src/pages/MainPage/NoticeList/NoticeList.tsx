import styled from "styled-components";

export const NoticeList = () => {
  return (
    <NoticeListDiv>
      <NoticeListWrap>
        <Notice>
          - 본 견적내기 서비스의 차량 외관 및 색상은 실제 차량과는 차이가 있을
          수 있으므로, 반드시 카탈로그 및 가격표 확인 부탁드리며 자세한 내용은
          카마스터에 문의하시길 바랍니다.
        </Notice>
        <Notice>
          - 본 견적내기 서비스는 고객님의 편리한 견적산출을 위해 구현된
          서비스로, 실제 계약 시 견적 내용과 일부 차이가 있을 수 있으니, 자세한
          사항은 반드시 카마스터에게 문의하시길 바랍니다.
        </Notice>
        <Notice>
          장애인, 렌터카, 택시, 트럭, 버스 차량의 기본가격은 면세가격
          기준입니다.
        </Notice>
        <Notice>
          면세 적용 여부에 따른 자세한 견적 금액은 반드시 카마스터에 문의하시길
          바랍니다.
        </Notice>
        <Notice>
          본 견적내용은 계약 시 변경될 수 있으며, 법적 구속력은 없습니다.
        </Notice>
        <Notice>
          본 견적내용은 계약 시 변경될 수 있으며, 법적 구속력은 없습니다.
        </Notice>
      </NoticeListWrap>
    </NoticeListDiv>
  );
};

const NoticeListDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoticeListWrap = styled.div`
  width: 80%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Notice = styled.p`
  margin: 5px 0px;
  color: grey;
  font-size: 10px;
`;
