import React from 'react';
import { INftRarity } from '@crypto-dev-amigos/common';
import { LazyComponent } from './lazy-component';
import { getIpfsUrl } from '../helpers/urls';
import { BarGraphCell } from './bar-graph';
import { Icon, IconLink } from './icons';

export type INftRarityWithExtra = INftRarity & {
    openSeaLink?: string;
    lastSell?: {
        price: number;
        symbol?: string;
        priceUsd?: number;
    },
    listing?: {
        price: number;
        symbol?: string;
        priceUsd?: number;
    },
};

const Price = (x?: {
    price: number;
    symbol?: string;
    priceUsd?: number;
}) => {
    
    if(!x){ return <span>{'-?-'}</span>}

    return (
        <>
            <span>{x.price.toFixed(3)}</span>
            {x.symbol && (
                x.symbol.toLowerCase() === 'eth' ? <span className='black-or-white'><Icon icon='eth'/></span> 
                : x.symbol.toLowerCase() === 'weth' ? <span style={{color: '#ca477b'}}><Icon icon='eth'/></span> 
                : <span>{x.symbol}</span>
            )}
            <span>{x.priceUsd ? ` $${x.priceUsd.toFixed(2)}`:''}</span>
        </>
    );
}

export const NftCardPlaceholder = (props:{})=>{
    return (
        <>
            <div className={'nft-card'}>
                <div style={{height: 300}}>Loading...</div>
            </div>
        </>
    );
}

export const NftCard = ({nft}:{ nft: INftRarityWithExtra }) => {

    return (
        <>
            <div className={'nft-card'}>
                <div className='nft-card-header'>
                    <div className='nft-card-header-item'>
                        <div className='nft-card-header-item-label'>Rarity Score:</div>
                        <div className='nft-card-header-item-value'>{nft.rarityScore.toFixed(2)}</div>
                    </div>
                    <div className='nft-card-header-item'>
                        <div className='nft-card-header-item-label'>Rank:</div>
                        <div className='nft-card-header-item-value'>{nft.rank}</div>
                    </div>
                    <div className='nft-card-header-item'>
                        <div className='nft-card-header-item-label'>Listing:</div>
                        <div className='nft-card-header-item-value'>{Price(nft.listing)}</div>
                    </div>
                    <div className='nft-card-header-item'>
                        <div className='nft-card-header-item-label'>Last Sell:</div>
                        <div className='nft-card-header-item-value'>{Price(nft.lastSell)}</div>
                    </div>
                    <div className='nft-card-header-title'>{nft.nft.name}</div>
                </div>

                <div className='nft-card-content'>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                        <IconLink url={nft.nft.external_url} icon='link'/>
                        <IconLink url={nft.openSeaLink} iconUrl='/media/opensea.png'/>
                    </div>
                    <div className={'nft-card-image'}>
                        {!!nft.nft.image && (
                            <LazyComponent>
                                <img alt='nft' src={getIpfsUrl(nft.nft.image)}/>
                            </LazyComponent>
                        )}
                    </div>

                    <div className='nft-card-stats'>
                        <div className='nft-card-stats-row nft-card-stats-title' style={{ fontSize:`0.8em` }}>
                            <div className='nft-card-stats-cell' style={{textAlign:'left'}}>{'Trait'}</div>
                            <div className='nft-card-stats-cell' style={{textAlign:'right'}}>{'Rarity Score'}</div>
                        </div>
                        <div className='nft-card-stats-row nft-card-stats-title' style={{ fontSize:`0.8em` }}>
                            <div className='nft-card-stats-cell' style={{textAlign:'right'}}>{''}</div>
                            <div className='nft-card-stats-cell'>{'Commonality'}</div>
                        </div>
                        {nft.attributeRarities.map(x=>(
                            <React.Fragment key={x.trait_type}>
                                <div className='nft-card-stats-row'>
                                    <div className='nft-card-stats-cell nft-card-stats-title' style={{textAlign:'left'}}>{x.trait_type}</div>
                                    <div className='nft-card-stats-cell' style={{textAlign:'right'}}>{`${x.ratioScore.toFixed(2)}`}</div>  
                                </div>
                                <div className='nft-card-stats-row'>
                                    <div className='nft-card-stats-cell' style={{textAlign:'right'}}>
                                        <span style={x.value !== "[Missing]"?{fontWeight:'bold'}:{}}>{x.value}</span>
                                    </div>
                                    <div className='nft-card-stats-cell'>
                                        <BarGraphCell ratio={x.ratio} />
                                    </div>                              
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
