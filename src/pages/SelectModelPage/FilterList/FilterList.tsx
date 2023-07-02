import { driveCodeState, engineCodeState, missionCodeState } from "@/stores";
import { useRecoilState } from "recoil";
import styled from "styled-components";

export const FilterList = () => {
  const [engineCode, setEngineCode] = useRecoilState(engineCodeState);
  const [missionCode, setMissionCode] = useRecoilState(missionCodeState);
  const [driveCode, setDriveCode] = useRecoilState(driveCodeState);

  return (
    <FilterListDiv>
      <h1>1</h1>
      <h1>2</h1>
      <h1>3</h1>
    </FilterListDiv>
  );
};

const FilterListDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: grey 0.5px solid;
`;
