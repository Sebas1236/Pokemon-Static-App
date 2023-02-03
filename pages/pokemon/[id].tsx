import { useEffect, useState } from "react";
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import confetti from 'canvas-confetti';

import { Layout } from "@/components/layouts";
import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";
import { textTransform, localFavorites, getPokemonInfo } from "@/utils";

interface Props {
    pokemon: Pokemon;
};

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState(false);

    useEffect(() => {
        setIsInFavorites(localFavorites.existsInFavorites(pokemon.id));
    }, [pokemon.id]);

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites);

        if( !isInFavorites ){
            confetti({
                zIndex: 999,
                particleCount: 150,
                spread: 160,
                angle: -100,
                origin: {
                    x: 1, y: 0
                }
            });
        }
    };

    return (
        <Layout title={textTransform.wordCapitalize(pokemon.name)}>
            <Grid.Container css={{
                marginTop: '5px'
            }} gap={2}>
                {/* todo el espacio es 12 */}
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ pading: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform="capitalize">
                                {pokemon.name}
                            </Text>
                            <Button
                                color="gradient"
                                ghost={!isInFavorites}
                                onPress={onToggleFavorite}
                            >
                                {
                                    isInFavorites ? 'En favoritos' : 'Guardar en favoritos'
                                }
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>
                                Sprites:
                            </Text>
                            <Container direction="row" display="flex" gap={0}>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    );
};

//* se usa cuando tenemos dynamic routes [id]
export const getStaticPaths: GetStaticPaths = async (ctx) => {

    //*sólo se ejecuta en el build
    const pokemons151 = [...Array(151)].map((value, index) =>
        `${index + 1}`
    );

    return {
        // paths: [
        //     {
        //         params: {
        //             id: '1'
        //         },
        //     }
        // ],
        paths: pokemons151.map(id => ({
            params: { id }
        })),
        //* blocking deja entrar
        fallback: false
    };
};

//* únicamente del lado del servidor y en build time
export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string };

    //* sólo las props llegan al cliente
    return {
        props: {
            pokemon: await getPokemonInfo( id ),
        },
    };
};

export default PokemonPage;