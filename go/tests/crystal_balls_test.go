package tests

import (
	"math/rand"
	"testing"

	"github.com/xduricai/dsa/go/search"
)

func TestCrsystalBalls(t *testing.T) {
	minHeight := rand.Intn(10000)
	breaks := [10000]bool{}

	for i := minHeight; i < 10000; i++ {
		breaks[i] = true
	}

	height := search.CrystalBallProblem(breaks[:])

	if height != minHeight {
		t.Errorf("Crystal ball problem failed.\nExpected min height: %d\nActual min height: %d\n", minHeight, height)
	}
}
