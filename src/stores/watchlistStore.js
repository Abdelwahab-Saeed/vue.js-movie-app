import { defineStore } from 'pinia'

export const useWatchlistStore = defineStore('watchlist', {
    state: () => ({
        watchlist: JSON.parse(localStorage.getItem('watchlist')) || []
    }),

    actions: {
        addToWatchlist(product) {  
            const exists = this.watchlist.find(item => item.id === product.id)
            if (!exists) {
                this.watchlist.push(product)
                this.saveToStorage()
            }
        },

        removeFromWatchlist(productId) {
            this.watchlist = this.watchlist.filter(item => item.id !== productId)
            this.saveToStorage()
        },

        isInWatchlist(productId) {  
            return this.watchlist.some(item => item.id === productId)
        },

        saveToStorage() {
            localStorage.setItem('watchlist', JSON.stringify(this.watchlist))
        }
    }
})