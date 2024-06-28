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

  useEffect(() => {
    if (playerName == "") {
      setPlayer(null);
      return;
    }
    const timer = setTimeout(() => {
      searchPlayer(playerName).then(
        (response) => {
          console.log(response);
          setSearchResult(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [playerName]);

  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPlayerName(e.target.value);
    setPlayer(null);
  };

  return (
    <PlayerSearchStyle>
      <input value={playerName} {...props} onChange={handleSearchInput} />
      {!player && (
        <ul>
          {searchResult.map((result) => {
            return (
              <li key={result.id} onClick={() => setPlayer(result)}>
                <p>{result.team}</p>
                <p>{result.player}</p>
                <p>{result.uniformNumber}</p>
              </li>
            );
          })}
        </ul>
      )}
    </PlayerSearchStyle>
  );
}

const PlayerSearchStyle = styled.div`
  position: relative;
  ul {
    /* margin: 0; */
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
        background-color: #e0f7fa; /* 추천 배경색 중 하나 */
      }
    }
  }
`;
