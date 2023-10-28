package tests

import (
	"testing"

	"github.com/xduricai/dsa/cache"
)

func TestLruCache(t *testing.T) {
	cache := cache.NewLRU[string, int](3)

	val, err := cache.Get("nyaa")
	if err == nil {
		t.Errorf("LRU failed, didn't return error when calling Get on an empty cache")
	}

	cache.Update("nyaa", 1)
	val, err = cache.Get("nyaa")
	if val != 1 || err != nil {
		t.Errorf("LRU failed, could not return a valid value from cache")
	}

	cache.Update("nyaaa", 2)
	cache.Update("nyaaaa", 3)
	cache.Update("nyaa", 4)

	val, err = cache.Get("nyaaa")
	if val != 2 || err != nil {
		t.Errorf("LRU failed, could not return a valid value from cache")
	}

	val, err = cache.Get("nyaaaa")
	if val != 3 || err != nil {
		t.Errorf("LRU failed, could not return a valid value from cache")
	}

	val, err = cache.Get("nyaa")
	if val != 4 || err != nil {
		t.Errorf("LRU failed, could not return a valid value from cache")
	}

	cache.Update("bleh", 10)
	val, err = cache.Get("nyaaa")
	if err == nil {
		t.Errorf("LRU failed, didn't return error when calling Get on a key not in cache")
	}

	cap := cache.Capacity()
	len := cache.Length()
	if len != 3 {
		t.Errorf("LRU failed, incorrect cache length")
	}
	if cap != 3 {
		t.Errorf("LRU failed, incorrect cache capacity")
	}
}
