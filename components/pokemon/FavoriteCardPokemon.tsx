import { FC } from "react"
import { Grid, Card } from "@nextui-org/react"
import { useRouter } from 'next/router';

interface Props {
    pokemonId: number,
};

export const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {
    
    const router = useRouter();

    const onFavoriteClick = () => {
        router.push(`/pokemon/${pokemonId}`);
    };
    
    return (
        <Grid key={pokemonId} xs={6} sm={3} md={2} xl={1} onClick={onFavoriteClick}>
            <Card isHoverable isPressable css={{ padding: 10 }}>
                <Card.Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                    width={'100%'}
                    height={140}
                />
            </Card>
        </Grid>
    )
}
