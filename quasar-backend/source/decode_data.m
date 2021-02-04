
function decode_data = decode_data(combined_sat_signal,sampling_rate,preamble_sat_signal) 

Fs = sampling_rate;

dy = combined_sat_signal;

fm_filtered_sig = fm_filter(dy,3000,17000,0.3*17000,Fs);

fm_demod_sig = fm_demod(fm_filtered_sig);

bp_filtered_sig = bp_filter(fm_demod_sig,400,4400,Fs);

am_filtered_sig = fm_filter(bp_filtered_sig, 2400,1600,0.3*1600,Fs);

t = [0:1/Fs:1/160];

syncA = square(1040*t*2*pi);

[l,m] = xcorr(abs(am_filtered_sig),syncA);

syncA_locs = l((length(l)+1)/2:end);

[max_syncA, max_syncA_loc] = max(abs(syncA_locs));

start_index = mod(max_syncA_loc,Fs/2);

image_start = resample(abs(am_filtered_sig(start_index:end)),4160*10,Fs/2);

num_lines = floor(length(image_start)/41600);

image_start = image_start(1:length(image_start)-mod(length(image_start),41600));

image_matrix = reshape(image_start,41600,[])';

figure;
imagesc(image_matrix(:,:));
% axis image;
colormap(gray);

end

