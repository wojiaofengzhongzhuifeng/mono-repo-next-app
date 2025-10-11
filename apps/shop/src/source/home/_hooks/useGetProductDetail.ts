import { useState, useEffect } from 'react'
import { ProductData } from '@/ProductDetail'

// 模拟的 SKU 数据，从 server.js 中的 getSkuList 函数复制
const mockSkuList = () => {
  return [
    // 一、电子产品（3个商品：iPhone 15 Pro、MacBook Air M3、AirPods Pro 3）
    {
      name: 'iPhone 15 Pro',
      image:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop',
      attributes: {
        color: ['黑色钛金属', '白色钛金属', '蓝色钛金属', '原色钛金属'],
        storage: ['128GB', '256GB', '512GB', '1TB'],
      },
      skus: [
        {
          id: 'p101-black-128',
          attrs: { color: '黑色钛金属', storage: '128GB' },
          price: 7999,
          stock: 32,
        },
        {
          id: 'p101-black-256',
          attrs: { color: '黑色钛金属', storage: '256GB' },
          price: 8799,
          stock: 28,
        },
        {
          id: 'p101-black-512',
          attrs: { color: '黑色钛金属', storage: '512GB' },
          price: 10399,
          stock: 15,
        },
        {
          id: 'p101-black-1t',
          attrs: { color: '黑色钛金属', storage: '1TB' },
          price: 11999,
          stock: 8,
        },
        {
          id: 'p101-white-128',
          attrs: { color: '白色钛金属', storage: '128GB' },
          price: 7999,
          stock: 29,
        },
        {
          id: 'p101-white-256',
          attrs: { color: '白色钛金属', storage: '256GB' },
          price: 8799,
          stock: 24,
        },
        {
          id: 'p101-white-512',
          attrs: { color: '白色钛金属', storage: '512GB' },
          price: 10399,
          stock: 12,
        },
        {
          id: 'p101-white-1t',
          attrs: { color: '白色钛金属', storage: '1TB' },
          price: 11999,
          stock: 6,
        },
        {
          id: 'p101-blue-128',
          attrs: { color: '蓝色钛金属', storage: '128GB' },
          price: 7999,
          stock: 25,
        },
        {
          id: 'p101-blue-256',
          attrs: { color: '蓝色钛金属', storage: '256GB' },
          price: 8799,
          stock: 20,
        },
        {
          id: 'p101-blue-512',
          attrs: { color: '蓝色钛金属', storage: '512GB' },
          price: 10399,
          stock: 9,
        },
        {
          id: 'p101-blue-1t',
          attrs: { color: '蓝色钛金属', storage: '1TB' },
          price: 11999,
          stock: 4,
        },
        {
          id: 'p101-original-128',
          attrs: { color: '原色钛金属', storage: '128GB' },
          price: 7999,
          stock: 35,
        },
        {
          id: 'p101-original-256',
          attrs: { color: '原色钛金属', storage: '256GB' },
          price: 8799,
          stock: 30,
        },
        {
          id: 'p101-original-512',
          attrs: { color: '原色钛金属', storage: '512GB' },
          price: 10399,
          stock: 18,
        },
        {
          id: 'p101-original-1t',
          attrs: { color: '原色钛金属', storage: '1TB' },
          price: 11999,
          stock: 10,
        },
      ],
    },
    {
      name: 'MacBook Air M3',
      image:
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop',
      attributes: {
        color: ['星光色', '深空灰色', '银色'],
        storage: ['256GB', '512GB', '1TB'],
      },
      skus: [
        {
          id: 'p102-star-256',
          attrs: { color: '星光色', storage: '256GB' },
          price: 8999,
          stock: 28,
        },
        {
          id: 'p102-star-512',
          attrs: { color: '星光色', storage: '512GB' },
          price: 10799,
          stock: 22,
        },
        {
          id: 'p102-star-1t',
          attrs: { color: '星光色', storage: '1TB' },
          price: 14399,
          stock: 12,
        },
        {
          id: 'p102-space-256',
          attrs: { color: '深空灰色', storage: '256GB' },
          price: 8999,
          stock: 33,
        },
        {
          id: 'p102-space-512',
          attrs: { color: '深空灰色', storage: '512GB' },
          price: 10799,
          stock: 26,
        },
        {
          id: 'p102-space-1t',
          attrs: { color: '深空灰色', storage: '1TB' },
          price: 14399,
          stock: 15,
        },
        {
          id: 'p102-silver-256',
          attrs: { color: '银色', storage: '256GB' },
          price: 8999,
          stock: 30,
        },
        {
          id: 'p102-silver-512',
          attrs: { color: '银色', storage: '512GB' },
          price: 10799,
          stock: 24,
        },
        {
          id: 'p102-silver-1t',
          attrs: { color: '银色', storage: '1TB' },
          price: 14399,
          stock: 13,
        },
      ],
    },
    {
      name: 'AirPods Pro 3',
      image:
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=800&fit=crop',
      attributes: {
        color: ['白色'],
        version: ['标准版', 'MagSafe充电盒版'],
      },
      skus: [
        {
          id: 'p103-white-standard',
          attrs: { color: '白色', version: '标准版' },
          price: 1899,
          stock: 105,
        },
        {
          id: 'p103-white-magsafe',
          attrs: { color: '白色', version: 'MagSafe充电盒版' },
          price: 2099,
          stock: 98,
        },
      ],
    },

    // 二、服装鞋帽（3个商品：Nike Air Max 270、Adidas三叶草卫衣、Levi's 501牛仔裤）
    {
      name: 'Nike Air Max 270',
      image:
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
      attributes: {
        color: ['黑橙', '白蓝', '灰粉', '全黑'],
        size: ['35.5', '36', '37.5', '38', '39', '40', '41', '42'],
      },
      skus: [
        {
          id: 'p201-black-orange-35.5',
          attrs: { color: '黑橙', size: '35.5' },
          price: 899,
          stock: 12,
        },
        {
          id: 'p201-black-orange-36',
          attrs: { color: '黑橙', size: '36' },
          price: 899,
          stock: 18,
        },
        {
          id: 'p201-black-orange-37.5',
          attrs: { color: '黑橙', size: '37.5' },
          price: 899,
          stock: 25,
        },
        {
          id: 'p201-black-orange-38',
          attrs: { color: '黑橙', size: '38' },
          price: 899,
          stock: 22,
        },
        {
          id: 'p201-black-orange-39',
          attrs: { color: '黑橙', size: '39' },
          price: 899,
          stock: 30,
        },
        {
          id: 'p201-black-orange-40',
          attrs: { color: '黑橙', size: '40' },
          price: 899,
          stock: 28,
        },
        {
          id: 'p201-black-orange-41',
          attrs: { color: '黑橙', size: '41' },
          price: 899,
          stock: 24,
        },
        {
          id: 'p201-black-orange-42',
          attrs: { color: '黑橙', size: '42' },
          price: 899,
          stock: 15,
        },
        {
          id: 'p201-white-blue-35.5',
          attrs: { color: '白蓝', size: '35.5' },
          price: 899,
          stock: 8,
        },
        {
          id: 'p201-white-blue-36',
          attrs: { color: '白蓝', size: '36' },
          price: 899,
          stock: 14,
        },
        {
          id: 'p201-white-blue-37.5',
          attrs: { color: '白蓝', size: '37.5' },
          price: 899,
          stock: 19,
        },
        {
          id: 'p201-white-blue-38',
          attrs: { color: '白蓝', size: '38' },
          price: 899,
          stock: 16,
        },
        {
          id: 'p201-white-blue-39',
          attrs: { color: '白蓝', size: '39' },
          price: 899,
          stock: 21,
        },
        {
          id: 'p201-white-blue-40',
          attrs: { color: '白蓝', size: '40' },
          price: 899,
          stock: 17,
        },
        {
          id: 'p201-white-blue-41',
          attrs: { color: '白蓝', size: '41' },
          price: 899,
          stock: 13,
        },
        {
          id: 'p201-white-blue-42',
          attrs: { color: '白蓝', size: '42' },
          price: 899,
          stock: 9,
        },
        {
          id: 'p201-gray-pink-35.5',
          attrs: { color: '灰粉', size: '35.5' },
          price: 899,
          stock: 5,
        },
        {
          id: 'p201-gray-pink-36',
          attrs: { color: '灰粉', size: '36' },
          price: 899,
          stock: 11,
        },
        {
          id: 'p201-gray-pink-37.5',
          attrs: { color: '灰粉', size: '37.5' },
          price: 899,
          stock: 16,
        },
        {
          id: 'p201-gray-pink-38',
          attrs: { color: '灰粉', size: '38' },
          price: 899,
          stock: 13,
        },
        {
          id: 'p201-gray-pink-39',
          attrs: { color: '灰粉', size: '39' },
          price: 899,
          stock: 8,
        },
        {
          id: 'p201-gray-pink-40',
          attrs: { color: '灰粉', size: '40' },
          price: 899,
          stock: 6,
        },
        {
          id: 'p201-gray-pink-41',
          attrs: { color: '灰粉', size: '41' },
          price: 899,
          stock: 4,
        },
        {
          id: 'p201-gray-pink-42',
          attrs: { color: '灰粉', size: '42' },
          price: 899,
          stock: 2,
        },
        {
          id: 'p201-all-black-35.5',
          attrs: { color: '全黑', size: '35.5' },
          price: 899,
          stock: 10,
        },
        {
          id: 'p201-all_black-36',
          attrs: { color: '全黑', size: '36' },
          price: 899,
          stock: 17,
        },
        {
          id: 'p201-all_black-37.5',
          attrs: { color: '全黑', size: '37.5' },
          price: 899,
          stock: 23,
        },
        {
          id: 'p201-all_black-38',
          attrs: { color: '全黑', size: '38' },
          price: 899,
          stock: 20,
        },
        {
          id: 'p201-all_black-39',
          attrs: { color: '全黑', size: '39' },
          price: 899,
          stock: 26,
        },
        {
          id: 'p201-all_black-40',
          attrs: { color: '全黑', size: '40' },
          price: 899,
          stock: 22,
        },
        {
          id: 'p201-all_black-41',
          attrs: { color: '全黑', size: '41' },
          price: 899,
          stock: 18,
        },
        {
          id: 'p201-all_black-42',
          attrs: { color: '全黑', size: '42' },
          price: 899,
          stock: 14,
        },
      ],
    },
    {
      name: 'Adidas三叶草卫衣',
      image:
        'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&h=800&fit=crop',
      attributes: {
        color: ['黑色', '白色', '灰色'],
        size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
      skus: [
        {
          id: 'p202-black-xs',
          attrs: { color: '黑色', size: 'XS' },
          price: 399,
          stock: 25,
        },
        {
          id: 'p202-black-s',
          attrs: { color: '黑色', size: 'S' },
          price: 399,
          stock: 32,
        },
        {
          id: 'p202-black-m',
          attrs: { color: '黑色', size: 'M' },
          price: 399,
          stock: 38,
        },
        {
          id: 'p202-black-l',
          attrs: { color: '黑色', size: 'L' },
          price: 399,
          stock: 35,
        },
        {
          id: 'p202-black-xl',
          attrs: { color: '黑色', size: 'XL' },
          price: 399,
          stock: 28,
        },
        {
          id: 'p202-black-xxl',
          attrs: { color: '黑色', size: 'XXL' },
          price: 399,
          stock: 22,
        },
        {
          id: 'p202-white-xs',
          attrs: { color: '白色', size: 'XS' },
          price: 399,
          stock: 22,
        },
        {
          id: 'p202-white-s',
          attrs: { color: '白色', size: 'S' },
          price: 399,
          stock: 29,
        },
        {
          id: 'p202-white-m',
          attrs: { color: '白色', size: 'M' },
          price: 399,
          stock: 35,
        },
        {
          id: 'p202-white-l',
          attrs: { color: '白色', size: 'L' },
          price: 399,
          stock: 32,
        },
        {
          id: 'p202-white-xl',
          attrs: { color: '白色', size: 'XL' },
          price: 399,
          stock: 25,
        },
        {
          id: 'p202-white-xxl',
          attrs: { color: '白色', size: 'XXL' },
          price: 399,
          stock: 19,
        },
        {
          id: 'p202-gray-xs',
          attrs: { color: '灰色', size: 'XS' },
          price: 399,
          stock: 20,
        },
        {
          id: 'p202-gray-s',
          attrs: { color: '灰色', size: 'S' },
          price: 399,
          stock: 27,
        },
        {
          id: 'p202-gray-m',
          attrs: { color: '灰色', size: 'M' },
          price: 399,
          stock: 33,
        },
        {
          id: 'p202-gray-l',
          attrs: { color: '灰色', size: 'L' },
          price: 399,
          stock: 30,
        },
        {
          id: 'p202-gray-xl',
          attrs: { color: '灰色', size: 'XL' },
          price: 399,
          stock: 23,
        },
        {
          id: 'p202-gray-xxl',
          attrs: { color: '灰色', size: 'XXL' },
          price: 399,
          stock: 17,
        },
      ],
    },
    {
      name: "Levi's 501牛仔裤",
      image:
        'https://images.unsplash.com/photo-1542271021-7f488b7f2444?w=800&h=800&fit=crop',
      attributes: {
        color: ['深蓝色', '浅蓝色', '黑色'],
        size: ['28', '29', '30', '31', '32', '33', '34', '35', '36'],
      },
      skus: [
        {
          id: 'p203-blue-dark-28',
          attrs: { color: '深蓝色', size: '28' },
          price: 799,
          stock: 12,
        },
        {
          id: 'p203-blue-dark-29',
          attrs: { color: '深蓝色', size: '29' },
          price: 799,
          stock: 15,
        },
        {
          id: 'p203-blue-dark-30',
          attrs: { color: '深蓝色', size: '30' },
          price: 799,
          stock: 18,
        },
        {
          id: 'p203-blue-dark-31',
          attrs: { color: '深蓝色', size: '31' },
          price: 799,
          stock: 16,
        },
        {
          id: 'p203-blue-dark-32',
          attrs: { color: '深蓝色', size: '32' },
          price: 799,
          stock: 14,
        },
        {
          id: 'p203-blue-dark-33',
          attrs: { color: '深蓝色', size: '33' },
          price: 799,
          stock: 10,
        },
        {
          id: 'p203-blue-dark-34',
          attrs: { color: '深蓝色', size: '34' },
          price: 799,
          stock: 8,
        },
        {
          id: 'p203-blue-dark-35',
          attrs: { color: '深蓝色', size: '35' },
          price: 799,
          stock: 6,
        },
        {
          id: 'p203-blue-dark-36',
          attrs: { color: '深蓝色', size: '36' },
          price: 799,
          stock: 4,
        },
        {
          id: 'p203-blue-light-28',
          attrs: { color: '浅蓝色', size: '28' },
          price: 799,
          stock: 10,
        },
        {
          id: 'p203-blue-light-29',
          attrs: { color: '浅蓝色', size: '29' },
          price: 799,
          stock: 13,
        },
        {
          id: 'p203-blue-light-30',
          attrs: { color: '浅蓝色', size: '30' },
          price: 799,
          stock: 16,
        },
        {
          id: 'p203-blue-light-31',
          attrs: { color: '浅蓝色', size: '31' },
          price: 799,
          stock: 14,
        },
        {
          id: 'p203-blue-light-32',
          attrs: { color: '浅蓝色', size: '32' },
          price: 799,
          stock: 12,
        },
        {
          id: 'p203-blue-light-33',
          attrs: { color: '浅蓝色', size: '33' },
          price: 799,
          stock: 8,
        },
        {
          id: 'p203-blue-light-34',
          attrs: { color: '浅蓝色', size: '34' },
          price: 799,
          stock: 6,
        },
        {
          id: 'p203-blue-light-35',
          attrs: { color: '浅蓝色', size: '35' },
          price: 799,
          stock: 4,
        },
        {
          id: 'p203-blue-light-36',
          attrs: { color: '浅蓝色', size: '36' },
          price: 799,
          stock: 3,
        },
        {
          id: 'p203-black-28',
          attrs: { color: '黑色', size: '28' },
          price: 799,
          stock: 11,
        },
        {
          id: 'p203-black-29',
          attrs: { color: '黑色', size: '29' },
          price: 799,
          stock: 14,
        },
        {
          id: 'p203-black-30',
          attrs: { color: '黑色', size: '30' },
          price: 799,
          stock: 17,
        },
        {
          id: 'p203-black-31',
          attrs: { color: '黑色', size: '31' },
          price: 799,
          stock: 15,
        },
        {
          id: 'p203-black-32',
          attrs: { color: '黑色', size: '32' },
          price: 799,
          stock: 13,
        },
        {
          id: 'p203-black-33',
          attrs: { color: '黑色', size: '33' },
          price: 799,
          stock: 9,
        },
        {
          id: 'p203-black-34',
          attrs: { color: '黑色', size: '34' },
          price: 799,
          stock: 7,
        },
        {
          id: 'p203-black-35',
          attrs: { color: '黑色', size: '35' },
          price: 799,
          stock: 5,
        },
        {
          id: 'p203-black-36',
          attrs: { color: '黑色', size: '36' },
          price: 799,
          stock: 4,
        },
      ],
    },

    // 三、家居用品（3个商品：无印良品收纳盒、宜家北欧风台灯、小米空气净化器）
    {
      name: '无印良品收纳盒',
      image:
        'https://images.unsplash.com/photo-1587620969629-9d1c6f9c8ba8?w=800&h=800&fit=crop',
      attributes: {
        size: ['小号(20×15×10cm)', '中号(30×20×15cm)', '大号(40×30×20cm)'],
        color: ['透明', '白色'],
      },
      skus: [
        {
          id: 'p301-small-transparent',
          attrs: { size: '小号(20×15×10cm)', color: '透明' },
          price: 39,
          stock: 105,
        },
        {
          id: 'p301-small-white',
          attrs: { size: '小号(20×15×10cm)', color: '白色' },
          price: 45,
          stock: 98,
        },
        {
          id: 'p301-medium-transparent',
          attrs: { size: '中号(30×20×15cm)', color: '透明' },
          price: 59,
          stock: 85,
        },
        {
          id: 'p301-medium-white',
          attrs: { size: '中号(30×20×15cm)', color: '白色' },
          price: 65,
          stock: 78,
        },
        {
          id: 'p301-large-transparent',
          attrs: { size: '大号(40×30×20cm)', color: '透明' },
          price: 89,
          stock: 62,
        },
        {
          id: 'p301-large-white',
          attrs: { size: '大号(40×30×20cm)', color: '白色' },
          price: 95,
          stock: 57,
        },
      ],
    },
    {
      name: '宜家北欧风台灯',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
      attributes: {
        color: ['原木色', '白色', '浅灰色'],
        lightMode: ['暖光(2700K)', '中性光(4000K)', '冷光(6500K)'],
      },
      skus: [
        {
          id: 'p302-wood-warm',
          attrs: { color: '原木色', lightMode: '暖光(2700K)' },
          price: 199,
          stock: 38,
        },
        {
          id: 'p302-wood-neutral',
          attrs: { color: '原木色', lightMode: '中性光(4000K)' },
          price: 199,
          stock: 32,
        },
        {
          id: 'p302-wood-cool',
          attrs: { color: '原木色', lightMode: '冷光(6500K)' },
          price: 199,
          stock: 29,
        },
        {
          id: 'p302-white-warm',
          attrs: { color: '白色', lightMode: '暖光(2700K)' },
          price: 199,
          stock: 45,
        },
        {
          id: 'p302-white-neutral',
          attrs: { color: '白色', lightMode: '中性光(4000K)' },
          price: 199,
          stock: 39,
        },
        {
          id: 'p302-white-cool',
          attrs: { color: '白色', lightMode: '冷光(6500K)' },
          price: 199,
          stock: 34,
        },
        {
          id: 'p302-gray-warm',
          attrs: { color: '浅灰色', lightMode: '暖光(2700K)' },
          price: 199,
          stock: 31,
        },
        {
          id: 'p302-gray-neutral',
          attrs: { color: '浅灰色', lightMode: '中性光(4000K)' },
          price: 199,
          stock: 26,
        },
        {
          id: 'p302-gray-cool',
          attrs: { color: '浅灰色', lightMode: '冷光(6500K)' },
          price: 199,
          stock: 23,
        },
      ],
    },
    {
      name: '小米空气净化器',
      image:
        'https://images.unsplash.com/photo-1593692614414-8d3f6e5c7d9d?w=800&h=800&fit=crop',
      attributes: {
        filterType: ['标准版滤网', '抗菌版滤网'],
        version: ['基础版', '智能版(APP控制)'],
      },
      skus: [
        {
          id: 'p303-standard-basic',
          attrs: { filterType: '标准版滤网', version: '基础版' },
          price: 899,
          stock: 38,
        },
        {
          id: 'p303-standard-smart',
          attrs: { filterType: '标准版滤网', version: '智能版(APP控制)' },
          price: 999,
          stock: 25,
        },
        {
          id: 'p303-antibacterial-basic',
          attrs: { filterType: '抗菌版滤网', version: '基础版' },
          price: 949,
          stock: 22,
        },
        {
          id: 'p303-antibacterial-smart',
          attrs: { filterType: '抗菌版滤网', version: '智能版(APP控制)' },
          price: 1049,
          stock: 16,
        },
      ],
    },

    // 四、食品饮料（3个商品：星巴克咖啡豆、费列罗巧克力、农夫山泉天然水）
    {
      name: '星巴克咖啡豆',
      image:
        'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop',
      attributes: {
        roast: ['轻度烘焙', '中度烘焙', '深度烘焙'],
        package: ['200g/袋', '500g/袋'],
      },
      skus: [
        {
          id: 'p401-light-200g',
          attrs: { roast: '轻度烘焙', package: '200g/袋' },
          price: 88,
          stock: 56,
        },
        {
          id: 'p401-light-500g',
          attrs: { roast: '轻度烘焙', package: '500g/袋' },
          price: 198,
          stock: 32,
        },
        {
          id: 'p401-medium-200g',
          attrs: { roast: '中度烘焙', package: '200g/袋' },
          price: 88,
          stock: 68,
        },
        {
          id: 'p401-medium-500g',
          attrs: { roast: '中度烘焙', package: '500g/袋' },
          price: 198,
          stock: 41,
        },
        {
          id: 'p401-dark-200g',
          attrs: { roast: '深度烘焙', package: '200g/袋' },
          price: 88,
          stock: 49,
        },
        {
          id: 'p401-dark-500g',
          attrs: { roast: '深度烘焙', package: '500g/袋' },
          price: 198,
          stock: 28,
        },
      ],
    },
    {
      name: '费列罗巧克力',
      image:
        'https://images.unsplash.com/photo-1543076499-a6133cb641dd?w=800&h=800&fit=crop',
      attributes: {
        package: ['16颗/盒(200g)', '32颗/盒(400g)'],
        giftBox: ['普通装', '节日礼盒装'],
      },
      skus: [
        {
          id: 'p402-16-normal',
          attrs: { package: '16颗/盒(200g)', giftBox: '普通装' },
          price: 99,
          stock: 128,
        },
        {
          id: 'p402-16-gift',
          attrs: { package: '16颗/盒(200g)', giftBox: '节日礼盒装' },
          price: 119,
          stock: 76,
        },
        {
          id: 'p402-32-normal',
          attrs: { package: '32颗/盒(400g)', giftBox: '普通装' },
          price: 189,
          stock: 85,
        },
        {
          id: 'p402-32-gift',
          attrs: { package: '32颗/盒(400g)', giftBox: '节日礼盒装' },
          price: 209,
          stock: 52,
        },
      ],
    },
    {
      name: '农夫山泉天然水',
      image:
        'https://images.unsplash.com/photo-1613564834361-9436948817d1?w=800&h=800&fit=crop',
      attributes: {
        capacity: ['550ml/瓶', '1.5L/瓶', '4L/桶'],
        package: ['单瓶装', '12瓶/箱(550ml)', '4桶/箱(4L)'],
      },
      skus: [
        {
          id: 'p403-550ml-single',
          attrs: { capacity: '550ml/瓶', package: '单瓶装' },
          price: 2,
          stock: 300,
        },
        {
          id: 'p403-550ml-12box',
          attrs: { capacity: '550ml/瓶', package: '12瓶/箱(550ml)' },
          price: 22,
          stock: 150,
        },
        {
          id: 'p403-1.5l-single',
          attrs: { capacity: '1.5L/瓶', package: '单瓶装' },
          price: 4,
          stock: 200,
        },
        {
          id: 'p403-4l-single',
          attrs: { capacity: '4L/桶', package: '单瓶装' },
          price: 10,
          stock: 180,
        },
        {
          id: 'p403-4l-4box',
          attrs: { capacity: '4L/桶', package: '4桶/箱(4L)' },
          price: 38,
          stock: 90,
        },
      ],
    },

    // 五、图书文具（3个商品：《JavaScript高级程序设计》、晨光中性笔套装、Moleskine笔记本）
    {
      name: '《JavaScript高级程序设计》',
      image:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      attributes: {
        binding: ['平装', '精装'],
        version: ['第4版(ES2020)', '第4版修订版(ES2022)'],
      },
      skus: [
        {
          id: 'p501-paper-4',
          attrs: { binding: '平装', version: '第4版(ES2020)' },
          price: 128,
          stock: 35,
        },
        {
          id: 'p501-paper-4rev',
          attrs: { binding: '平装', version: '第4版修订版(ES2022)' },
          price: 138,
          stock: 28,
        },
        {
          id: 'p501-hard-4',
          attrs: { binding: '精装', version: '第4版(ES2020)' },
          price: 188,
          stock: 18,
        },
        {
          id: 'p501-hard-4rev',
          attrs: { binding: '精装', version: '第4版修订版(ES2022)' },
          price: 198,
          stock: 15,
        },
      ],
    },
    {
      name: '晨光中性笔套装',
      image:
        'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=800&h=800&fit=crop',
      attributes: {
        color: ['黑色6支+蓝色3支+红色3支', '全黑色12支', '全蓝色12支'],
        tip: ['0.5mm子弹头', '0.38mm针管头'],
      },
      skus: [
        {
          id: 'p502-mix-0.5',
          attrs: { color: '黑色6支+蓝色3支+红色3支', tip: '0.5mm子弹头' },
          price: 15,
          stock: 140,
        },
        {
          id: 'p502-mix-0.38',
          attrs: { color: '黑色6支+蓝色3支+红色3支', tip: '0.38mm针管头' },
          price: 16,
          stock: 120,
        },
        {
          id: 'p502-black-0.5',
          attrs: { color: '全黑色12支', tip: '0.5mm子弹头' },
          price: 15,
          stock: 95,
        },
        {
          id: 'p502-black-0.38',
          attrs: { color: '全黑色12支', tip: '0.38mm针管头' },
          price: 16,
          stock: 85,
        },
        {
          id: 'p502-blue-0.5',
          attrs: { color: '全蓝色12支', tip: '0.5mm子弹头' },
          price: 15,
          stock: 65,
        },
        {
          id: 'p502-blue-0.38',
          attrs: { color: '全蓝色12支', tip: '0.38mm针管头' },
          price: 16,
          stock: 55,
        },
      ],
    },
    {
      name: 'Moleskine笔记本',
      image:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      attributes: {
        size: ['口袋版(13×21cm)', '标准版(17×25cm)', '大号版(21×29cm)'],
        pageType: ['横线', '点阵', '空白'],
      },
      skus: [
        {
          id: 'p503-pocket-line',
          attrs: { size: '口袋版(13×21cm)', pageType: '横线' },
          price: 99,
          stock: 38,
        },
        {
          id: 'p503-pocket-dot',
          attrs: { size: '口袋版(13×21cm)', pageType: '点阵' },
          price: 99,
          stock: 31,
        },
        {
          id: 'p503-pocket-blank',
          attrs: { size: '口袋版(13×21cm)', pageType: '空白' },
          price: 99,
          stock: 25,
        },
        {
          id: 'p503-standard-line',
          attrs: { size: '标准版(17×25cm)', pageType: '横线' },
          price: 129,
          stock: 34,
        },
        {
          id: 'p503-standard-dot',
          attrs: { size: '标准版(17×25cm)', pageType: '点阵' },
          price: 129,
          stock: 28,
        },
        {
          id: 'p503-standard-blank',
          attrs: { size: '标准版(17×25cm)', pageType: '空白' },
          price: 129,
          stock: 22,
        },
        {
          id: 'p503-large-line',
          attrs: { size: '大号版(21×29cm)', pageType: '横线' },
          price: 159,
          stock: 26,
        },
        {
          id: 'p503-large-dot',
          attrs: { size: '大号版(21×29cm)', pageType: '点阵' },
          price: 159,
          stock: 20,
        },
        {
          id: 'p503-large-blank',
          attrs: { size: '大号版(21×29cm)', pageType: '空白' },
          price: 159,
          stock: 15,
        },
      ],
    },
  ]
}

export const useGetProductDetailHooks = (productId: string) => {
  const [productData, setProductData] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true)

      try {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 500))

        // 从模拟数据中查找对应商品
        const skuList = mockSkuList()
        const product = skuList.find(
          item =>
            item.name.includes(productId) ||
            item.skus.some(sku => sku.id.includes(productId))
        )

        setProductData(product || null)
      } catch (error) {
        console.error('获取商品详情失败:', error)
        setProductData(null)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProductDetail()
    }
  }, [productId])

  return {
    productData,
    loading,
  }
}
