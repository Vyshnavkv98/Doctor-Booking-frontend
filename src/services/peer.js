class peerService {
    constructor() {
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [{
                    urls: [
                        'stuns:stuns.l.google.com:19302',
                        'stun:global.stun.twilio.com:3478',
                    ]
                }]
            })
        }
    }
    async getOffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer()
            await this.peer.setLocalDescription(new RTCSessionDescription(offer));
            return offer
        }
    }

    async getAnswer(offer) {
        await this.peer.setRemoteDescription(offer)
        const answer =await this.peer.createAnswer()
        await this.peer.setLocalDescription(new RTCSessionDescription(answer));
        return answer
    }

    async setLocalDescription(answer) {
        if (this.peer) {
          try {
            const sessionDescription = new RTCSessionDescription(answer);
            await this.peer.setRemoteDescription(sessionDescription);
            console.log('Remote description set successfully.');
          } catch (error) {
            console.error('Error setting remote description:', error);
          }
        } else {
          console.error('Peer connection not available.');
        }
      }
} export default new peerService()