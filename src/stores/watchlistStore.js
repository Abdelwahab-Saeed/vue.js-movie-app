import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWatchlistStore = defineStore('watchlist', () => {
    const watchlist = ref([])

    const fetchUserWatchlist = async () => {
        try {
            const userId = localStorage.getItem('loggedInUserId')
            if (!userId) return

            const userRes = await fetch(`http://localhost:3000/users/${userId}`)
            const user = await userRes.json()
            const watchlistIds = user.watchlist || []

            console.log('User ID:', userId)
            console.log('Fetched user:', user)
            console.log('Watchlist IDs:', watchlistIds)

            const moviePromises = watchlistIds.map(id =>
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6a1cabb5e93fd6605356ead9aa9712dd`)
                    .then(res => res.json())
            )

            watchlist.value = await Promise.all(moviePromises)
        } catch (error) {
            console.error('Error fetching watchlist:', error)
        }
    }

    const addToWatchlist = async (movie) => {
        try {
            const userId = localStorage.getItem('loggedInUserId')
            if (!userId) throw new Error('User not logged in')

            const response = await fetch(`http://localhost:3000/users/${userId}`)
            const user = await response.json()

            const updatedWatchlist = [...new Set([...(user.watchlist || []), movie.id])]

            await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...user, watchlist: updatedWatchlist })
            })

            if (!watchlist.value.some(m => m.id === movie.id)) {
                watchlist.value.push(movie)
            }
        } catch (error) {
            console.error('Error adding to watchlist:', error)
        }
    }

    const removeFromWatchlist = async (movieId) => {
        try {
            const userId = localStorage.getItem('loggedInUserId')
            if (!userId) throw new Error('User not logged in')

            const response = await fetch(`http://localhost:3000/users/${userId}`)
            const user = await response.json()

            const updatedWatchlist = (user.watchlist || []).filter(id => id !== movieId)

            await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...user, watchlist: updatedWatchlist })
            })

            watchlist.value = watchlist.value.filter(movie => movie.id !== movieId)
        } catch (error) {
            console.error('Error removing from watchlist:', error)
        }
    }

    return {
        watchlist,
        fetchUserWatchlist,
        addToWatchlist,
        removeFromWatchlist
    }
})
