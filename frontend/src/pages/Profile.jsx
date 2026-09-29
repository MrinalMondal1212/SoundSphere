import { useState } from "react";
import heroImg from "../assets/hero.png";

function Profile() {
  const [activeTab, setActiveTab] = useState("Authors");
  const [activeFilter, setActiveFilter] = useState("Filter Num");

  const profileItems = [
    {
      title: "Liked Songs",
      subtitle: "Playlist · 59 tracks",
      type: "liked",
    },
    {
      title: "Sad Playlist",
      subtitle: "Playlist · 23 tracks",
      type: "sad",
    },
    {
      title: "Eminem",
      subtitle: "Artist",
      type: "eminem",
    },
    {
      title: "Adele",
      subtitle: "Artist",
      type: "adele",
    },
    {
      title: "Happy Playlist",
      subtitle: "Playlist · 23 tracks",
      type: "happy",
    },
    {
      title: "Lana Del Ray",
      subtitle: "Artist",
      type: "lana",
    },
    {
      title: "Harry Styles",
      subtitle: "Artist",
      type: "harry",
    },
  ];

  const getCardStyle = (type) => {
    const styles = {
      liked: "bg-gradient-to-br from-red-500 to-pink-600",
      sad: "bg-gradient-to-br from-slate-700 to-blue-950",
      eminem: "bg-gradient-to-br from-gray-700 to-black",
      adele:
        "bg-gradient-to-br from-amber-200 via-stone-400 to-stone-800",
      happy:
        "bg-gradient-to-br from-orange-300 to-amber-800",
      lana:
        "bg-gradient-to-br from-slate-400 via-purple-500 to-slate-800",
      harry:
        "bg-gradient-to-br from-gray-500 via-zinc-700 to-black",
    };

    return styles[type] || "bg-zinc-700";
  };

  return (
    <main className="flex-1 min-w-0 bg-[#151515] text-white">

      {/* =====================================================
          PROFILE HEADER
      ====================================================== */}
      <section className="px-5 md:px-8 lg:px-10 pt-7">

        <div
          className="relative overflow-hidden rounded-lg min-h-[175px] px-6 md:px-8 py-7"
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(54, 15, 48, 0.98),
                rgba(46, 17, 43, 0.92)
              ),
              url(${heroImg})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          {/* Profile content */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

            {/* Profile Image */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#111] flex items-center justify-center border-4 border-[#171717] flex-shrink-0">

              <svg
                width="58"
                height="58"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.4"
              >
                <circle cx="12" cy="7" r="3.5" />
                <path d="M5 21c0-4 3-6 7-6s7 2 7 6" />
              </svg>

            </div>


            {/* User Details */}
            <div>

              <p className="text-[10px] text-gray-300 mb-1">
                Profile
              </p>

              <h2 className="text-3xl md:text-4xl font-bold">
                Username
              </h2>

              <div className="flex flex-wrap gap-2 md:gap-3 mt-2 text-[10px] text-gray-300">

                <span>
                  3 Public Playlists
                </span>

                <span>•</span>

                <span>
                  19 Followers
                </span>

                <span>•</span>

                <span>
                  45 Following
                </span>

                <span>•</span>

                <span>
                  21 Credits
                </span>

              </div>

            </div>

          </div>


          {/* Edit Profile */}
          <button
            className="
              absolute
              top-7
              right-7
              text-[10px]
              text-cyan-400
              hover:text-cyan-300
              flex
              items-center
              gap-1
            "
          >

            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 013 3L8 18l-4 1 1-4Z" />
            </svg>

            Edit Profile

          </button>

        </div>

      </section>


      {/* =====================================================
          FILTER / TAB SECTION
      ====================================================== */}
      <section className="px-5 md:px-8 lg:px-10 mt-5">

        <div className="bg-[#292929] rounded-lg px-5 md:px-7 py-4">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">


            {/* Authors / Playlists */}
            <div className="flex items-center gap-2">

              <button
                onClick={() => setActiveTab("Authors")}
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-[10px]
                  transition
                  ${
                    activeTab === "Authors"
                      ? "bg-[#3b3b3b] text-white"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >
                Authors
              </button>


              <button
                onClick={() => setActiveTab("Playlists")}
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-[10px]
                  transition
                  ${
                    activeTab === "Playlists"
                      ? "bg-[#3b3b3b] text-white"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >
                Playlists
              </button>

            </div>


            {/* Filters */}
            <div className="flex items-center gap-5">

              {/* Genre */}
              <div>

                <p className="text-[9px] text-gray-400 mb-1">
                  Music Genre
                </p>

                <button
                  onClick={() => setActiveFilter("Genre")}
                  className="
                    bg-[#202020]
                    px-3
                    py-2
                    rounded-md
                    text-[9px]
                    text-gray-300
                    hover:bg-[#252525]
                    transition
                  "
                >
                  Filter Num

                  <span className="ml-3">
                    ⌄
                  </span>
                </button>

              </div>


              {/* Mood */}
              <div>

                <p className="text-[9px] text-gray-400 mb-1">
                  Music Mood
                </p>

                <button
                  onClick={() => setActiveFilter("Mood")}
                  className="
                    bg-[#202020]
                    px-3
                    py-2
                    rounded-md
                    text-[9px]
                    text-gray-300
                    hover:bg-[#252525]
                    transition
                  "
                >
                  Filter Num

                  <span className="ml-3">
                    ⌄
                  </span>
                </button>

              </div>

            </div>

          </div>


          {/* =================================================
              CONTENT TITLE + CREATE
          ================================================== */}
          <div className="mt-5">

            <div className="flex justify-between items-center mb-4">

              <p className="text-[10px] text-gray-500">
                {activeTab}
              </p>

              <button
                className="
                  bg-[#3a3a3a]
                  hover:bg-[#444]
                  px-4
                  py-2
                  rounded-full
                  text-[10px]
                  text-gray-200
                  transition
                "
              >
                + Create
              </button>

            </div>


            {/* =================================================
                PROFILE CARDS
            ================================================== */}
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-7
                gap-5
              "
            >

              {profileItems.map((item, index) => (

                <div
                  key={index}
                  className="group cursor-pointer"
                >

                  {/* Artwork */}
                  <div
                    className={`
                      ${getCardStyle(item.type)}
                      aspect-square
                      rounded-md
                      overflow-hidden
                      relative
                      shadow-lg
                      group-hover:scale-[1.02]
                      transition-transform
                    `}
                  >

                    {/* Decorative circles */}
                    <div
                      className="
                        absolute
                        -right-6
                        -bottom-8
                        w-24
                        h-24
                        rounded-full
                        bg-black/20
                      "
                    />

                    <div
                      className="
                        absolute
                        -left-7
                        -top-8
                        w-20
                        h-20
                        rounded-full
                        bg-white/10
                      "
                    />


                    {/* Icon */}
                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                      "
                    >

                      {item.type === "liked" ? (
                        <span className="text-4xl text-white">
                          ♥
                        </span>
                      ) : (
                        <span className="text-4xl text-white/80">
                          ♪
                        </span>
                      )}

                    </div>

                  </div>


                  {/* Card information */}
                  <div className="mt-2">

                    <p className="text-[10px] text-gray-200 truncate">
                      {item.title}
                    </p>

                    <p className="text-[8px] text-gray-500 mt-1">
                      {item.subtitle}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Profile;