import ArtistHero       from '../components/Artist/ArtistHero'
import PopularSongs     from '../components/Artist/PopularSongs'
import ArtistAlbums     from '../components/Artist/ArtistAlbums'
import SingleSongs      from '../components/Artist/SingleSongs'
import ArtistPlaylist   from '../components/Artist/ArtistPlaylist'
import FansAlsoListenTo from '../components/Artist/FansAlsoListenTo'

/**
 * Artist Page
 * ────────────
 * Shows the full artist profile for a given artist.
 *
 * TODO: When connecting to backend:
 *   - Route will become /artist/:id
 *   - Use useParams() to get artist ID
 *   - Fetch artist data: GET /api/artists/:id
 *   - Pass fetched data as props to child components
 */
const Artist = () => {
  return (
    <div className="max-w-[1300px]">
      <ArtistHero />
      <PopularSongs />
      <ArtistAlbums />
      <SingleSongs />
      <ArtistPlaylist />
      <FansAlsoListenTo />
    </div>
  )
}

export default Artist
