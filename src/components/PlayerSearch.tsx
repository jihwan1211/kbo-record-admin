import styled from "styled-components";
import { useState, useEffect, ChangeEventHandler } from "react";
import { searchPlayer } from "../api/player.api";
import { TPlayer } from "../models/WeeklyPlayerRecord";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  player: TPlayer | null;
  setPlayer: React.Dispatch<React.SetStateAction<TPlayer | null>>;
}

export default function PlayerSearch({ player, setPlayer, ...props }: Props) {
  const [playerName, setPlayerName] = useState<string>(() => (player !== null ? player.player : ""));
  const [searchResult, setSearchResult] = useState<TPlayer[]>([]);
  const [noDataResponse, setNoDataResponse] = useState(false);

  useEffect(() => {
    if (playerName == "") {
      setPlayer(null);
      return;
    }
    const timer = setTimeout(() => {
      searchPlayer(playerName).then(
        (response) => {
          if (response.message === "NO-DATA") {
            setNoDataResponse(true);
            return;
          }
          setSearchResult(response);
        },
        (error) => {}
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [playerName]);

  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPlayerName(e.target.value);
    setNoDataResponse(false);
    setPlayer(null);
    setSearchResult([]);
  };

  return (
    <PlayerSearchStyle>
      <input value={playerName} {...props} onChange={handleSearchInput} />
      {noDataResponse ? (
        <p className="error">검색된 선수가 없습니다. 선수를 등록하세요.</p>
      ) : (
        !player && (
          <ul>
            {searchResult.map((result) => (
              <li key={result.id} onClick={() => setPlayer(result)}>
                <p>{result.team}</p>
                <p>{result.player}</p>
                <p>{result.uniformNumber}</p>
              </li>
            ))}
          </ul>
        )
      )}
    </PlayerSearchStyle>
  );
}

const PlayerSearchStyle = styled.div`
  position: relative;
  ul {
    width: 100%;
    position: absolute;
    background-color: white;
    li {
      display: flex;
      justify-content: center;
      gap: 5px;
      border: 1px solid black;
      cursor: pointer;
      &:hover {
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: #e0f7fa;
      }
    }
  }

  .error {
    position: absolute;
    background-color: white;
    color: ${({ theme }) => theme.color.error};
    font-size: 0.875rem;
    border: 1px solid black;
  }
`;
