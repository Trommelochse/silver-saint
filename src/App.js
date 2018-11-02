import StreamEvent from './StreamEvent';
import firebase from '../firebase';

const db = firebase.firestore();
db.settings({
	timestampsInSnapshots: true
});

const ocb = '7ddb8793-e408-4da4-a3d0-09ce59b61d2d';

class App {
	constructor(targetNode) {
		this.targetNode = targetNode;
		this.languageCode = 'fi';
		this.leagues = [];
		this.streamEvents = [];
		this.maxStreamEvents = 10;

		this.render();
	}

	sortStreamEvents() {
		this.streamEvents
			.sort((a, b) => this.leagueOrder.indexOf(a.sci) - this.leagueOrder.indexOf(b.sci));
	}

	getStreamEvents() {
		const scids = this.leagues.map(l => l.scid).join(',');
		const api = `https://bts-api-a.bpsgameserver.com/isa/v2/901/${this.languageCode}/event`;
		const url = `${api}?ocb=${ocb}&subCategoryIds=${scids}&EventMarketCount=1&streamTypeIds=1`;
		return fetch(url);
	}

	getLeagueOrder() {
		this.leagueOrder = this.leagues
			.slice()
			.sort((a, b) => a.priority - b.priority)
			.map(l => l.scid);
	}

	renderStreamEvents() {
		for (let i=0; i<this.streamEvents.length; i++) {
			if (i>=this.maxStreamEvents) return;
			this.targetNode.appendChild(this.streamEvents[i].node);
		}
	}

	render() {
		db.collection('leagues')
			.where('market', '==', this.languageCode)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					const docData = doc.data();
					this.leagues.push(docData);
				});
				this.getLeagueOrder();

				this.getStreamEvents()
					.then(data => data.json())
					.then(data => {
						this.streamEvents = data.el.map(ed => new StreamEvent(ed))
							.sort((a, b) => this.leagueOrder.indexOf(a.data.sci) - this.leagueOrder.indexOf(b.data.sci));
					})
					.then(() => {
						this.renderStreamEvents();
					});
			})
			.catch(error => {
				console.error('Error getting documents: ', error);
			});
	}
}

export default App;