import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import trackerService from '../../services/tracker.service';
import type {
  DailyReelCounts,
  DailyUsage,
  LiveTrackerState,
  TrackerResult,
  TrackingCapabilities,
} from '../../types';
import { trackerDayKey } from '../../utils/date';

export interface TrackerState {
  capabilities: TrackingCapabilities | null;
  today: TrackerResult<DailyReelCounts> | null;
  todayUsage: TrackerResult<DailyUsage> | null;
  live: LiveTrackerState | null;
  loading: boolean;
}

const initialState: TrackerState = {
  capabilities: null,
  today: null,
  todayUsage: null,
  live: null,
  loading: false,
};

export const fetchCapabilities = createAsyncThunk('tracker/capabilities', () =>
  trackerService.getCapabilities(),
);

export const fetchToday = createAsyncThunk('tracker/today', () => {
  const day = trackerDayKey();
  return Promise.all([trackerService.getDayCounts(day), trackerService.getDayUsage(day)]).then(
    ([counts, usage]) => ({ counts, usage }),
  );
});

const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    liveUpdated: (state, action: PayloadAction<LiveTrackerState>) => {
      state.live = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCapabilities.fulfilled, (state, action) => {
        state.capabilities = action.payload;
      })
      .addCase(fetchToday.pending, state => {
        state.loading = true;
      })
      .addCase(fetchToday.fulfilled, (state, action) => {
        state.loading = false;
        state.today = action.payload?.counts ?? null;
        state.todayUsage = action.payload?.usage ?? null;
      })
      .addCase(fetchToday.rejected, state => {
        state.loading = false;
      });
  },
});

export const { liveUpdated } = trackerSlice.actions;

export default trackerSlice.reducer;
