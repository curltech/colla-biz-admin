import { EntityState, httpClientPool } from 'libcolla'
import {  RemoteDbEntity } from '@/libs/remotedb'
import Vue from 'vue'

export class MasterDetailEntity {
	public masterEntity: RemoteDbEntity
	public detailEntity: RemoteDbEntity
	public relateKey: string
	constructor(master: string, detail: string, relateKey: string) {
		this.masterEntity = new RemoteDbEntity(master)
		this.detailEntity = new RemoteDbEntity(detail)
		this.relateKey = relateKey
	}

	relate(current: any, orderby: string) {
		if (current && current[this.relateKey]) {
			let param: any = {}
			param[this.relateKey] = current[this.relateKey]
			this.detailEntity.find(param, orderby, 0, 0, 0).then((result: any) => {
				if (result) {
					Vue.set(current, 'details', result.data)//current.details = result.data
				}
			}).catch((error: any) => {
				console.error(error)
			})
		}
	}
}